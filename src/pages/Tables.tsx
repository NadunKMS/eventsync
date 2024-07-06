import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import UserList from '../components/Tables/UserList';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
        <UserList/>
      </div>
    </>
  );
};

export default Tables;
