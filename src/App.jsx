import { useReducer } from 'react';
import Item from './components/Item';
import Modal from './components/Modal';

const initialState = {
  inputText: '',
  listItems: [],
  modalContent: '',
  modalType: 'none',
  showModal: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        inputText: action.payload
      };
    case 'SUBMIT':
      return {
        ...state,
        listItems: [
          ...state.listItems,
          {
            text: state.inputText,
            id: new Date().getTime().toString()
          }
        ],
        inputText: '',
        modalContent: 'item added',
        modalType: 'add',
        showModal: true
      };
    case 'NO_INPUT':
      return {
        ...state,
        modalContent: 'please enter a value',
        modalType: 'delete',
        showModal: true
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        listItems: state.listItems.map((item) =>
          item.id === action.payload.argId ? { text: action.payload.argText, id: action.payload.argId } : item
        ),
        modalContent: 'item value changed',
        modalType: 'edit',
        showModal: true
      };
    case 'REMOVE_MODAL':
      return {
        ...state,
        showModal: false
      };
    case 'DELETE':
      return {
        ...state,
        listItems: state.listItems.filter((item) => item.id !== action.payload),
        modalContent: 'item deleted',
        modalType: 'delete',
        showModal: true
      };
    case 'RESET':
      return {
        ...initialState,
        modalContent: 'empty list',
        modalType: 'delete',
        showModal: true
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeModal = () => {
    dispatch({ type: 'REMOVE_MODAL' });
  };

  return (
    <>
      {state.showModal && <Modal modalContent={state.modalContent} modalType={state.modalType} removeModal={removeModal} />}
      <div className='container'>
        <h1>Grocery Bud</h1>
        <form
          className='main-form'
          onSubmit={(e) => {
            e.preventDefault();
            if (state.inputText) {
              dispatch({ type: 'SUBMIT' });
            } else {
              dispatch({ type: 'NO_INPUT' });
            }
          }}>
          <input
            type='text'
            placeholder='e.g. milk'
            value={state.inputText}
            onChange={(e) => dispatch({ type: 'INPUT', payload: e.target.value })}
          />
          <button type='submit'>submit</button>
        </form>
        <div className='list-container'>
          {state.listItems.map(({ text, id }) => (
            <Item
              key={id}
              id={id}
              text={text}
              deleteItem={() => dispatch({ type: 'DELETE', payload: id })}
              editItem={(argId, argText) => {
                if (argText) {
                  dispatch({ type: 'EDIT_ITEM', payload: { argId, argText } });
                } else {
                  dispatch({ type: 'DELETE', payload: argId });
                }
              }}
            />
          ))}
        </div>
        {state.listItems.length > 0 ? (
          <button id='reset-btn' type='reset' onClick={() => dispatch({ type: 'RESET' })}>
            clear items
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default App;
