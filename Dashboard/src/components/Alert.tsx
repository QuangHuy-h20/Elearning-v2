import { useEffect, useState } from "react";
import BellIcon from "../icons/BellIcon";

interface IAlertProps {
  message: string;
}

const Alert = (props: IAlertProps) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setShowAlert(false), 2000);
    return clearTimeout(timer);
  }, []);
  return (
    <>
      {showAlert ? (
        <div className=" text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500">
          <span className="text-xl inline-block mr-5 align-middle">
            <BellIcon color="#fff" fill="#fff" />
          </span>
          <span className="inline-block align-middle mr-8">
            {props.message}
          </span>
          <button
            className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
