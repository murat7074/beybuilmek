
const CustomButtonGroup = ({btnData, type, btnHandle }) => {
  return (
    <div className='flex flex-wrap gap-2 sm:justify-between md:justify-center md:gap-x-10 p-2'>
      {btnData.map((button) => (
        <button
          key={button.name}
          className={`btn btn-info ${
            type === button.name ? 'border-red-500 opacity-100' : 'border-gray-100'
          } text-xs lg:text-sm border-2 w-24 opacity-80`}
          name={button.name}
          onClick={btnHandle}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default CustomButtonGroup;
