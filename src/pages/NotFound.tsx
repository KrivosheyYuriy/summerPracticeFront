import '../styles/notFound.css'

const NotFound= () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404 - Страница не найдена</h1>
                <p className="not-found-message">
                    К сожалению, запрашиваемая страница не существует или вы неправильно ввели ее адрес.
                </p>
                <div className="not-found-options">
                    <a href="/" className="not-found-link">
                        Вернуться на главную
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;