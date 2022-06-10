import { useSelector, useDispatch } from 'react-redux';

import Modal from './components/Modal';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

import { getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(state => state.modal.modalIsOpen);
  const { cartItems, isLoading } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  let content = (
    <div className='loading'>
      <h1>Loading ...</h1>
    </div>
  );

  if (!isLoading) content = <CartContainer />;

  return (
    <main>
      {modalIsOpen && <Modal />}
      <Navbar />
      {content}
    </main>
  );
}
export default App;
