import { ThemeSwitch } from '@/components/ThemeSwitch';
import { ThemeContext } from '@/contexts/ThemeContext';
import useUser from '@/lib/useUser';
import { loginApi } from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ContainerHeader, Content, NavLink, Profile } from './styles';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const { user } = useUser();

  const handleLogout = async () => {
    await loginApi.get('logout');

    router.push('/');
  };

  return (
    <ContainerHeader>
      <Content>
        <nav>
          <img
            src={`/logo-${theme === 'light' ? 'light' : 'dark'}.svg`}
            alt="fast-feet"
          />

          <NavLink active={router.pathname === '/dashboard/deliveries'}>
            <Link href="/dashboard/deliveries" passHref>
              ENCOMENDAS
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/dashboard/deliverymans'}>
            <Link href="/dashboard/deliverymans" passHref>
              ENTREGADORES
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/dashboard/recipients'}>
            <Link href="/dashboard/recipients" passHref>
              DESTINATÁRIOS
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/dashboard/problems'}>
            <Link href="/dashboard/problems" passHref>
              PROBLEMAS
            </Link>
          </NavLink>
        </nav>

        <aside>
          <ThemeSwitch />
          <Profile>
            <div>
              <strong>{user && user.name}</strong>
              <button type="button" onClick={handleLogout}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </ContainerHeader>
  );
};

export default Header;
