import React, { useState } from "react";
import styles from "./inputControl.module.css";
import { LuEyeClosed } from "react-icons/lu";
import { IoMdEye } from "react-icons/io";

const InputControl = ({
  label,
  isPassword,
  register,
  placeholder,
  name,
  errors,
}) => {
  const [toggle, onToggle] = useState(isPassword);
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.inputContainer}>
        <input
          type={toggle ? "password" : "text"}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          {...register(name)}
        />
        <div className={styles.icon}>
          {isPassword &&
            (toggle ? (
              <LuEyeClosed onClick={() => onToggle(!toggle)} />
            ) : (
              <IoMdEye onClick={() => onToggle(!toggle)} />
            ))}
        </div>
      </div>
      {errors && <span className={styles.error}>{errors.message}</span>}
    </div>
  );
};

export default InputControl;
