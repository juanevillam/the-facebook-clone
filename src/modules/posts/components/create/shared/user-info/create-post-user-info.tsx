import { NoProfilePicImage } from '@/components/images';

export const CreatePostUserInfo = () => {
  return (
    <div className="flex items-center p-3 md:p-4">
      <NoProfilePicImage />
      <div className="flex ml-2 md:ml-3">
        <p className="font-semibold dark:text-smoke-1000">Juan Villa</p>
      </div>
    </div>
  );
};
