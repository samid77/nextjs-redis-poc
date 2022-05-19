
import {useState} from 'react';
import {Container, ListGroup, Badge, InputGroup, FormControl, Row, Col, Button, Form } from 'react-bootstrap';

export default function BookForm() {
    const [hits, setHits] = useState([]);
    
    const searchBook = async (event) => {
        const keyword = event.target.value;

        if(keyword.length > 2) {
            const params = new URLSearchParams({keyword})
            const res = await fetch('/api/search?' + params)
            const result = await res.json();
            setHits(result['books']);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
        console.log(`formData: ${JSON.stringify(formData)}`)

        const res = await fetch('/api/books', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json();
        console.log(`result: ${JSON.stringify(result, undefined, 2)}`)


    }

    return(
        <div>
            <Container fluid style={{marginTop: '50px'}}>
                <Col md={3}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" name='title' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name='author' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" name='isbn' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name='description' rows={3} />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={6} style={{marginTop: 20}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Search Book</Form.Label>
                            <Form.Control type="text" onChange={searchBook} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} style={{marginTop: 20}}>
                    <ListGroup as="ol" numbered>
                        {
                            hits.map((h, idx) => (
                                <div key={idx}>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">{h.title}</div>
                                        {h.author}
                                        </div>
                                        <Badge bg="primary" pill>
                                        {h.isbn}
                                        </Badge>
                                    </ListGroup.Item>
                                </div>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Container>
            {/* <form >
                <input name='title' type='text'/>
                <input name='author' type='text'/>
                <input name='isbn' type='text'/>
                <textarea name='description' type='text'/>

                <Button variant="info">Save Book</Button>
            </form> */}
        </div>
    )
}