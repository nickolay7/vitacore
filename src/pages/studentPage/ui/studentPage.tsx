
import { StudentChart } from "../../../shared/components/StudentChart";
import styles from './styles.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Alert } from "../../../shared/components/alert";
export const StudentPage = () => {

  return (
      <>
          <h2>Student Statistics</h2>
          <div className={styles.container}>
              <Alert message="Please choose date range in the date pickers and click button."/>
              <StudentChart />
          </div>
      </>
  );
};
