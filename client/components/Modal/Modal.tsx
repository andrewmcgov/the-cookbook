import * as React from 'react';
import { FiX } from 'react-icons/fi';
import { IconContext } from 'react-icons';

interface Props {
  modalOpen: boolean;
  title?: string;
  content: JSX.Element;
  actionType?: 'primary' | 'secondary' | 'dangerous';
  actionName?: string;
  onAction?: () => void;
  closeFn: () => void;
}

function Modal({
  modalOpen,
  title,
  content,
  actionType,
  actionName,
  onAction,
  closeFn
}: Props) {
  return (
    <>
      <div
        className={`modal__background ${
          modalOpen ? 'modal__backgound--open' : ''
        }`}
        onClick={closeFn}
      />
      <div className={`modal ${modalOpen ? 'modal--open' : ''}`}>
        {title && (
          <div className="modal__header">
            <h3 className="modal__title">{title}</h3>
            <button className="modal__close" onClick={closeFn}>
              <IconContext.Provider value={{ size: '2.5rem' }}>
                <FiX />
              </IconContext.Provider>
            </button>
          </div>
        )}

        <div className="modal__content">
          <div>{content}</div>
        </div>

        {actionName && onAction && modalOpen && (
          <div className="modal__actions">
            <button
              className={`button button-${actionType}`}
              onClick={onAction}
            >
              {actionName}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Modal;
