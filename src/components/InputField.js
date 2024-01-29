import React from 'react';

const InputField = (props) => {
  var error = false;
  if (props.formDataError[props.labelName]) {
    error = true;
  }
  return (
    <div className={`flex flex-col md:flex-row justify-center self-center w-full lg:w-2/3 items-center md:text-left `}>
      <label className='text-lg text-slate-200 mr-2 w-1/3' htmlFor={props.labelName}>
        {props.labelName.charAt(0).toUpperCase() + props.labelName.slice(1)}
      </label>
      <div>
        <input
          className={`rounded-md shadow-md p-1 ${error ? 'border-b-4 border-red-500' : ''}`}
          type="text"
          id={props.labelName}
          placeholder='type here...'
          name={props.labelName}
          value={props.formData[props.labelName]} 
          onChange={props.handleInputChange}
        />
        <p className="text-sm text-red-400 mt-2">{props.formDataError[props.labelName]}</p>
      </div>
    </div>
  );
};

export default InputField;
