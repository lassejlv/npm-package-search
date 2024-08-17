import { getPackage } from '@/actions/npm';
import { Separator } from '@/components/ui/separator';
import CopyField from '@/components/copyField';
import MarkdownRender from '@/components/markdownRender';
import { NpmSinglePackage } from '@/lib/types';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Bug, Github, Home } from 'lucide-react';
import Save from '@/components/save';

export const revalidate = 0;

export default async function page({ params }: { params: any }) {
  const { package: pkg } = params;

  const url = `${pkg.join('/').replace('%40', '@')}`;
  let isSubPackage = false;

  if (pkg.length > 1) {
    isSubPackage = true;
  } else {
    isSubPackage = false;
  }

  let data: NpmSinglePackage | undefined;

  // const isCached = await redis.get(`pkg:${params.package}`);
  // console.log('isCached', isCached);

  // if (isCached) {
  //   data = JSON.parse(isCached);
  // } else {
  //   const pkgData = await getPackage(params.package);

  //   if (pkgData.error) return <div>error: {pkgData.message}</div>;
  //   if (!pkgData.data) return <div>no data</div>;

  //   data = pkgData.data as NpmSinglePackage;

  //   await redis.set(`pkg:${params.package}`, JSON.stringify(pkgData.data), 'EX', 60 * 60); // 1 hour
  // }

  // if (!data) return <div>no data in cache</div>;

  const pkgData = await getPackage(`${isSubPackage ? url : params.package}`);

  if (pkgData.error) return <div>error: {pkgData.message}</div>;
  if (!pkgData.data) return <div>no data</div>;

  data = pkgData.data as NpmSinglePackage;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg text-white" href="/">
                  Package
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg text-gray-300 flex items-center">
                  {params.package.join('/')} <Save name={data.name} />
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-lg text-gray-500 font-bold">v{data['dist-tags']?.latest} (latest)</p>
          <p className="text-md text-gray-500">{data.description}</p>
          <div className="flex gap-2 mt-2">
            {data.homepage && (
              <Button variant="outline">
                <a href={data.homepage ?? '#'} target="_blank" rel="noreferrer">
                  <Home size={18} className="inline mr-2 items-center" />
                  Homepage
                </a>
              </Button>
            )}

            {data.repository && (
              <Button variant="outline">
                <a href={data.repository.url.replace('git+', '') ?? '#'} target="_blank" rel="noreferrer">
                  <Github size={18} className="inline mr-2 items-center" />
                  Repository
                </a>
              </Button>
            )}

            {data.bugs && (
              <Button variant="outline">
                <a href={data.bugs.url ?? '#'} target="_blank" rel="noreferrer">
                  <Bug size={18} className="inline mr-2 items-center" />
                  Bugs
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <CopyField name={data.name} />
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex items-center  gap-2">
        {data.readme.length < 1 ? <p>No readme available</p> : <MarkdownRender markdown={data.readme} />}
      </div>
    </div>
  );
}
