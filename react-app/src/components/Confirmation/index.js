// Necessary imports
import './Confirmation.css'

function Confirmation({ label, message, onYes, onNo, yesLabel, noLabel }){
    return (
        <>
            <div className='overall-container'>
                <div className='label'>
                    <h1 className='header-font' style={{ textAlign: 'center' }}>{label}</h1>
                </div>
                <div className='message-container'>
                    <p className='content-font confirmation-content'>{message}</p>
                </div>
                <div className='confirmation-buttons-container'>
                    {/* <button onClick={onYes} className='confirmation-button yes'><p>Yes {yesLabel ? `(${yesLabel})`: ''}</p></button> */}

                    <div onClick={onYes} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="button-font">Yes{yesLabel ? `(${yesLabel})`: ''}</span>
                    </div>
                    <div onClick={onNo} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="button-font">No{noLabel ? `(${noLabel})`: ''}</span>
                    </div>

                    {/* <button onClick={onNo} className='confirmation-button no'><p>No {noLabel ? `(${noLabel})`: ''}</p></button> */}
                </div>
            </div>
        </>
    )
}

export default Confirmation