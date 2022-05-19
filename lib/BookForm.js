
import {Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function BookForm() {

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