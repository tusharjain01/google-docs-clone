// import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
// import { useEditContext } from './Dashboard';

function ListDoc({ docs }) {
  // const { edit } = useEditContext();
  // console.log(useEditContext);
  const navigate = useNavigate()
  return (
    <Table borderless hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Created On</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {docs ? docs.map(doc => (
          <tr key={doc.id} onClick={() => {
            navigate(`/edit/${doc.id}`)
          }}>
            <td>-</td>
            <td>{doc?.title}</td>
            <td>{doc?.createdOn.toDate().toDateString()}</td>
            <td> - </td>
          </tr>

        )):
        <>
        <tr>
          <td colSpan={4}>Create a new document by clicking on '+' icon</td>
        </tr>
        </>}
      </tbody>
    </Table>
  );
}

export default ListDoc;