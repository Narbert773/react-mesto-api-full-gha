import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

function DeleteCoonfirmationPopup({ isOpened, onClose, onDeleteCard, isLoading }) {

    const { isValid } = useFormValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard();
    }

    return (
        <PopupWithForm
            name='confirm-delete'
            title='Вы уверены?'
            isOpened={isOpened}
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
            btnText='Да'
            isLoading={isLoading}
            loadingText="Удаление..."
        >
        </PopupWithForm>
    )
}

export default DeleteCoonfirmationPopup;