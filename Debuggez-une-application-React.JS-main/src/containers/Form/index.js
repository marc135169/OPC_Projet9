import {useCallback, useEffect, useState} from "react";
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
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`nom:${nom}, prenom:${prenom}, email:${email}, message:${message}`);
  }, [nom, prenom, message, email]);
  
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
            />
            <Field
                placeholder=""
                label="Prénom"                
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
            />
            <Select
                selection={["Personel", "Entreprise"]}
                onChange={() => null}
                label="Personel / Entreprise"
                type="large"
                titleEmpty
            />
            <Field
                placeholder=""
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
