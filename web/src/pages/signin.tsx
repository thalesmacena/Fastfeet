import useUser from '@/lib/useUser';

const SignIn = () => {
  useUser({
    redirectTo: '/dashboard/deliveries',
    redirectIfFound: true
  });

  return <h1>Login</h1>;
};

export default SignIn;
