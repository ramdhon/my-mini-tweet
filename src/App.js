import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useState, useEffect } from 'react';

function App() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  function saveToLocal(updatedTweets) {
    localStorage.setItem('tweetData', JSON.stringify(updatedTweets));
  }
  function tweeting(e) {
    e.preventDefault();
    const updatedTweets = [
      {
        text: newTweet,
        likes: 0,
        retweets: 0,
      },
      ...tweets
    ]
    setTweets(updatedTweets);
    saveToLocal(updatedTweets);
    setNewTweet('');
  }
  function counter(field, index) {
    const mapped = tweets.map((tweet, id) => {
      if (id === index) {
        tweet[field]++
      }
      return tweet;
    })
    setTweets([...mapped]);
    saveToLocal([...mapped]);
  }

  useEffect(() => {
    const tweetDataStr = localStorage.getItem('tweetData');
    if (!tweetDataStr) return;
    const tweetData = JSON.parse(tweetDataStr)
    setTweets([...tweetData]);
  }, [])
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">My First Tweet App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={tweeting}>
              <Form.Group className="my-3">
                <Form.Label>What do you think of today?</Form.Label>
                <Form.Control value={newTweet} onChange={(e) => setNewTweet(e.target.value)} placeholder="Write your thought" />
              </Form.Group>

              <Button variant="primary" className="mb-4" type="submit">
                Tweet
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              tweets.map((tweet, index) => (
                <Card key={`tweet-${index}`}>
                  <Card.Body>
                    <Card.Text>
                      "{tweet.text}"
                    </Card.Text>
                    <Button onClick={() => counter('likes', index)} variant="primary">Like {tweet.likes || ''}</Button>
                    <Button onClick={() => counter('retweets', index)} variant="outline-primary">Retweet {tweet.retweets || ''}</Button>
                  </Card.Body>
                </Card>
              ))
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
