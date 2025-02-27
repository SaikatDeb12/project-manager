import InputControl from "../InputControl/InputControl";
import styles from "./auth.module.css";
import { useForm } from "react-hook-form";

const Auth = ({ signup }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit()}>
        <p className={styles.heading}>{signup ? "SignUp" : "login"}</p>
        <InputControl
          label={"Name: "}
          placeholder={"Enter your name"}
          {...register("name")}
        />
        <InputControl
          label={"Email: "}
          placeholder={"Enter your email"}
          {...register("email")}
        />
        <InputControl
          label={"Password: "}
          isPassword={true}
          placeholder={"Enter the password"}
          {...register("password")}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Auth;
