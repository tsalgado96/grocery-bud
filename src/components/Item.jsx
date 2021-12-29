import { useState } from 'react';

const Item = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(props.text);

  if (isEditing)
    return (
      <div className='item-container' key={props.id}>
        <form className='edit-form'>
          <input autoFocus type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} />
          <div className='item-btns'>
            <button
              className='edit-btn'
              onClick={() => {
                setIsEditing(!isEditing);
                props.editItem(props.id, inputText);
              }}>
              <i className='fas fa-check'></i>
            </button>
            <button className='delete-btn' onClick={props.deleteItem}>
              <i className='fas fa-trash-alt'></i>
            </button>
          </div>
        </form>
      </div>
    );
  else {
    return (
      <div className='item-container' key={props.id}>
        <p>{inputText}</p>
        <div className='item-btns'>
          <button className='edit-btn' onClick={() => setIsEditing(!isEditing)}>
            <i className='fas fa-pen'></i>
          </button>
          <button className='delete-btn' onClick={props.deleteItem}>
            <i className='fas fa-trash-alt'></i>
          </button>
        </div>
      </div>
    );
  }
};

export default Item;
