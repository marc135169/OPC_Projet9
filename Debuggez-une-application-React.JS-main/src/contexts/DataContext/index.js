import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};
/**
 * 
 * @param children
 * @return {JSX.Element}
 * @constructor
 * @description DataProvider is a React Context Provider that provides data to its children.
 * It uses the api object to fetch data from the server and set it in the context.
 */
export const DataProvider = ({ children }) => {
  
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  
  const getData = useCallback(async () => {
    try {
      const result = await api.loadData();
      setData(result);
      
      if (result?.events?.length > 0) {
        const sortedEvents = result.events.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLast(sortedEvents[0]);
      }
    } catch (err) {
      setError(err);
    }
  }, []);
  
  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        last, 
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
