import {useCallback, useState} from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {  
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [sending, setSending] = useState(false);  
  
  // UseEffect for test all states setters of the form
  // eslint-disable-next-line no-console
  /* useEffect(() => {    
    console.log(`nom:${nom}, prenom:${prenom}, email:${email}, message:${message}`);
  }, [nom, prenom, message, email]); */
    
    /**
     * Handles the submission of the contact form.
     *
     * This function prevents the default form submission behavior, sets the `sending` state to `true`,
     * simulates an API call using `mockContactApi`, and manages success and error callbacks.
     *
     * @function sendContact
     * @async
     * @param {Event} evt - The event object from the form submission.
     * @returns {Promise<void>} - Resolves once the form submission process is complete.
     *
     * @throws {Error} If the simulated API call fails, the error is caught and passed to `onError`.
     *
     * @example
     * <form onSubmit={sendContact}>
     *   <button type="submit">Send</button>
     * </form>
     *
     * @dependencies
     * - `mockContactApi`: Simulates an asynchronous API call with a delay.
     * - React `useState` for managing form state.
     *
     * @see mockContactApi
     */
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);      
      const data = { nom, prenom, email, message };      
      try {
        await mockContactApi(data);
        setSending(false); 
        onSuccess();         
      } catch (err) {
        setSending(false);
        onError(err);        
      }
    },
    [onSuccess, onError, nom, prenom, email, message]      
  );
  return (
      <form onSubmit={sendContact}>
        <div className="row">
          <div className="col">
            <Field
                placeholder=""
                label="Nom"                
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
            />
            <Field
                placeholder=""
                label="Prénom"                
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
            />
            <Select
                selection={["Personnel", "Entreprise"]}
                onChange={() => null}
                label="Personnel / Entreprise"
                type="large"
                titleEmpty
                required
            />
            <Field
                placeholder=""
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
          </div>
          <div className="col">
            <Field
                placeholder="message test"
                label="Message"
                type={FIELD_TYPES.TEXTAREA}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
          </div>
        </div>
      </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
