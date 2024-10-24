import { FcGoogle } from "react-icons/fc";
// file imports
import HeroImg from "../../assets/hero-img.jpg";
import { Button, Logo } from "../../components";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  // google login hook
  const { login, loading, error } = useLogin();

  const googleLogin = async () => {
    await login();
  };

  return (
    <section className="w-full min-h-screen flex justify-between items-center">
      <div className="h-screen flex flex-col c-space bg-white w-full sm:w-1/2 relative">
        <div className="text-4xl pt-8">
          <Logo variant="green" />
        </div>

        <div className="w-full lg:w-1/2 h-1/2 flex flex-col justify-center m-auto shadow-xl py-20 px-10 text-gray-700 rounded-lg">
          <h2 className="text-3xl font-medium text-green pb-4">Join Today</h2>
          <p className="pb-4 text-green">Sign in with one of our providers</p>

          {error && <p className="text-red-500">{error}</p>}
          <Button btnStyle="green" onClick={googleLogin} disabled={loading}>
            <div className="flex align-middle justify-center gap-2 py-2">
              <FcGoogle className="hidden sm:block text-2xl" />
              Sign in with Google
            </div>
          </Button>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2 h-screen">
        <img
          src={HeroImg}
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Login;
