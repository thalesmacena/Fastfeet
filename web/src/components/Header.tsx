import { ThemeContext } from '@/contexts/ThemeContext';
import useUser from '@/lib/useUser';
import { loginApi } from '@/services/api';
import {
  ContainerHeader,
  Content,
  NavLink,
  Profile
} from '@/styles/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

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

          <NavLink active={router.pathname === '/deliveries'}>
            <Link href="/deliveries" passHref>
              ENCOMENDAS
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/deliverymans'}>
            <Link href="/deliverymans" passHref>
              ENTREGADORES
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/recipients'}>
            <Link href="/recipients" passHref>
              DESTINATÁRIOS
            </Link>
          </NavLink>

          <NavLink active={router.pathname === '/problems'}>
            <Link href="/problems" passHref>
              PROBLEMAS
            </Link>
          </NavLink>
        </nav>

        <aside>
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
