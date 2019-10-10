import React, { useEffect, useState } from 'react';
import { request } from '../../utils/api';
import { match as Match } from 'react-router-dom'
import { Link } from 'react-router-dom';

interface Session {
  attachments: unknown[];
  category_ids: string[];
  categories: Array<{ id: string, name: string }>;
  child_session_ids: string[];
  child_sessions: unknown[];
  description: string;
  entities: Array<{ id: string, name: string }>;
  entity_ids: string[]
  external_id: string;
  favoritable: boolean;
  id: number;
  image_url: string;
  location: { id: string, name: string };
  location_id: string;
  name: string;
  persistent: boolean;
  subtitle: string;
  tba: boolean;
  thumbnail_image_url: string;
  time_start: string;
  time_stop: string;
  visible: boolean;
}

interface Props {
  sessionId: number;
  match: Match<{ id: string }>;
}

const SessionDetail: React.FC<Props> = (props) => {
  const { match: { params: { id }} } = props;
  const [session, setSession] = useState<Session>(null as any);
  useEffect(() => {
    request(`/sessions/${id}`, {}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setSession(data.data);
      }
    });
  }, [id])
  if (!session) {
    return null;
  }
  return (
    <>
      <h1>Session detail</h1>
      <div>
        <div>Name: {session.name}</div>
        <div>Location: {session.location && session.location.name}</div>
        <div>Description: {session.description}</div>
        <div>Categories: {session.categories && session.categories.map((c) => c.name).join(', ')}</div>
        <div>Start: {session.time_start}</div>
        <div>End: {session.time_stop}</div>
        <div style={{marginTop: '20px'}}>Child Sessions</div>
        <ul>
          {session.child_session_ids.map((id) => {
            return <li><Link to={`/session/${id}`}>{id}</Link></li>;
          })}
        </ul>
        <div><Link to={`/`}>Back</Link></div>
      </div>
    </>
  );
}

export default SessionDetail;