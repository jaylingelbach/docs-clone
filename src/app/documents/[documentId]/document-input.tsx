import { BsCloudCheck } from 'react-icons/bs';

const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        untitled document
      </span>
      <BsCloudCheck height={36} width={36} />
    </div>
  );
};
export default DocumentInput;
