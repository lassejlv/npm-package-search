'use server';

import { ActionResponse, NpmPackage, NpmPackageObject, NpmSinglePackage } from '@/lib/types';
import ky from 'ky';

const API_URL = 'https://registry.npmjs.org';

export const searchPackages = async (searchQuery: string): Promise<ActionResponse<NpmPackage>> => {
  try {
    const response = await ky.get(`${API_URL}/-/v1/search?text=${encodeURIComponent(searchQuery)}`).json();

    return {
      error: false,
      message: 'Success',
      data: response as NpmPackage,
    };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};

export const getPackage = async (packageName: string): Promise<ActionResponse<NpmSinglePackage>> => {
  try {
    const response = await ky.get(`${API_URL}/${encodeURIComponent(packageName)}`).json();

    return {
      error: false,
      message: 'Success',
      data: response as NpmSinglePackage,
    };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
