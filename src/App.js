import Modal from './components/Modal';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

import { useSelector } from 'react-redux';

function App() {
  const modalIsOpen = useSelector(state => state.modal.modalIsOpen);

  return (
    <main>
      {modalIsOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
