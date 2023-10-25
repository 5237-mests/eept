import { useState } from 'react';
import API from './API';

function BulkInsertQuestions() {
  const [file, setFile] = useState();
  const [complete, setComplete] = useState(false)
  const [load, setLoad] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick =  async () => {
    if (!file) {
      return;
    }

    setLoad(true)
    setComplete(false)
    const csrf = API.get("auth/getcsrf/");

    API.defaults.headers["X-CSRFToken"] = `${(await csrf).data.csrftoken}`;

    const formData = new FormData();
    formData.append('file', file);

    await API.post("api/add-questions/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setTimeout(()=> {
      setComplete(true)
      setTimeout(()=> setComplete(false), 4000)
      setLoad(false)
   }, 2000)
  };

  return (
    <div className='view-result mt-5 container '>
      <h5><strong>Hint:</strong> <small className="text-muted">prepare an excel file exactly like below and save as .csv extension!!! .</small></h5>
      <small className='text-muted'>
       <table>
        <thead>
          <td>text</td> <td>cha</td> <td>chb</td> <td>chc</td> <td>chd</td> <td>ans</td> <td>job</td>
        </thead>
        <tbody>
          <tr>
            <td>What is The Capital City of France?</td> <td>London</td><td>Paris</td>
            <td>Mosco</td> <td>Ogadugo</td> <td>Paris</td> <td>HR6</td>
          </tr>
        </tbody>
       </table>
      </small>
      <input className='btn btn-info  p-3 mt-3' type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>
      {complete && <p className='text-success  font-weight-bold bg-light text-center'>Successfully uploaded! </p>}
            {load && <p className='text-danger font-weight-bold bg-light text-center'>Uploading.... </p>}
      <button className='btn btn-primary mt-3' onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default BulkInsertQuestions;
