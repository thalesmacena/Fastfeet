import Input from '@/components/InputText';
import { LoadingSpin } from '@/components/LoadingSpin';
import { ThemeContext } from '@/contexts/ThemeContext';
import useUser from '@/lib/useUser';
import { api, loginApi } from '@/services/api';
import { Container, Modal } from '@/styles/pages/SignIn';
import { Form } from '@unform/web';
import { useRouter } from 'next/dist/client/router';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface LoginData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { theme } = useContext(ThemeContext);
  const formRef = useRef(null);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();

  useUser({
    redirectTo: '/dashboard/deliveries',
    redirectIfFound: true
  });

  const handleSubmit = async (data: LoginData) => {
    setIsLoading(true);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um email válido')
          .required('O email é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha precisa ter no minimo 6 caracteres')
          .required('A senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const response = await loginApi.post('login', {
        email: data.email,
        password: data.password
      });

      if (!response.data.admin) {
        await loginApi.get('logout');
        throw new Error('admin');
      }

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      Router.push('dashboard/deliveries');
    } catch (err) {
      setIsLoading(false);

      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        setIsInvalidLogin(true);
        if (err.message === 'admin') {
          toast.error(
            'É Preciso ser um provedor de serviços para acessar essa aplicação, baixe a versão mobile'
          );
        } else {
          toast.error('Login inválido, verifique seus dados');
        }

        setTimeout(() => {
          setIsInvalidLogin(false);
        }, 2000);
      }
    }
  };

  return (
    <Container>
      <Modal>
        <img
          src={`/${theme === 'light' ? 'logo-light.svg' : 'logo-dark.svg'}`}
          alt="Fastfeet"
        />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <strong>SEU E-MAIL</strong>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
          </div>

          <div>
            <strong>SUA SENHA</strong>
            <Input
              name="password"
              type="password"
              placeholder="*************"
            />
          </div>

          {isInvalidLogin ? (
            <button disabled type="submit">
              Login Inválido
            </button>
          ) : (
            <button type="submit">
              {isLoading ? (
                <LoadingSpin size={16} color="#fff" spinWidth={5} />
              ) : (
                'Entrar no sistema'
              )}
            </button>
          )}
        </Form>
      </Modal>
    </Container>
  );
};

export default SignIn;
