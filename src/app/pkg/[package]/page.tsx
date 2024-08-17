import { getPackage } from '@/actions/npm';
import { Separator } from '@/components/ui/separator';
import CopyField from '@/components/copyField';
import MarkdownRender from '@/components/markdownRender';
import { NpmSinglePackage } from '@/lib/types';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Bug, Github, Home } from 'lucide-react';

export const revalidate = 0;

export default async function page({ params }: { params: { package: string } }) {
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

  const pkgData = await getPackage(params.package);

  if (pkgData.error) return <div>error: {pkgData.message}</div>;
  if (!pkgData.data) return <div>no data</div>;

  data = pkgData.data as NpmSinglePackage;

  console.log('home', data.homepage);
  console.log('repo', data.repository);
  console.log('bugs', data.bugs);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg text-black" href="/">
                  Package
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg text-black" href={`/pkg/${params.package}`}>
                  {params.package}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-lg text-gray-500 font-bold">v{data['dist-tags']?.latest} (latest)</p>
          <p className="text-md text-gray-500">{data.description}</p>
          <div className="flex gap-2 mt-2">
            {data.homepage && (
              <Button variant="outline">
                <a href={data.homepage} target="_blank" rel="noreferrer">
                  <Home size={18} className="inline mr-2 items-center" />
                  Homepage
                </a>
              </Button>
            )}

            {data.repository.url && (
              <Button variant="outline">
                <a href={data.repository.url.replace('git+', '')} target="_blank" rel="noreferrer">
                  <Github size={18} className="inline mr-2 items-center" />
                  Repository
                </a>
              </Button>
            )}

            {data.bugs.url && (
              <Button variant="outline">
                <a href={data.bugs.url} target="_blank" rel="noreferrer">
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
