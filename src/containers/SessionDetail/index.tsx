import React, { useEffect, useState } from 'react';
import jsonp from 'jsonp';


const baseUrl = 'https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions';
const auth = '?api=cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2';

interface Props {
  sessionId: number;
}

const SessionDetail: React.FC<Props> = (props) => {
  const { sessionId } = props;
  const [session, setSession] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      jsonp(baseUrl+''+auth, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          setSession(data.data);
        }
      });
    }

    fetchData();
  }, [])

  return (
    <>
    <h1>session detail</h1>
    </>
  );
}

export default SessionDetail;