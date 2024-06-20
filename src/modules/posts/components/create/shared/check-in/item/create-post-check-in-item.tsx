export type locationType = google.maps.places.AutocompletePrediction;

interface CreatePostCheckInItemProps {
  onClick: (location: locationType) => void;
  location: locationType;
  selected: boolean;
}

export const CreatePostCheckInItem = ({
  onClick,
  location,
  selected,
}: CreatePostCheckInItemProps) => {
  const selectLocation = () => onClick(location);

  return (
    <button
      className={`duration-150 hover:bg-gray-200 px-3 py-2 text-start rounded-lg transition w-full dark:hover:bg-dark-600 ${
        selected && 'bg-gray-300 dark:bg-dark-400'
      }`}
      onClick={selectLocation}
      type="button"
    >
      <p className="text-gray-800 font-bold dark:text-gray-200">
        {location.structured_formatting.main_text}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {location.structured_formatting.secondary_text}
      </p>
    </button>
  );
};
