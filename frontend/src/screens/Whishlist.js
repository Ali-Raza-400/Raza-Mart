import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

export const Whishlist = () => {
    const products = [
        { id: 1, name: "Smartphone", price: 699.99, image: "/logo512.png", description: "Latest model with advanced features." },
        { id: 2, name: "Laptop", price: 1299.99, image: "/logo512.png", description: "Powerful laptop for work and play." },
        { id: 3, name: "Headphones", price: 199.99, image: "/logo512.png", description: "Noise-cancelling wireless headphones." },
    ];
const onRemove=(id)=>{
    // Remove product from wishlist here
    console.log('Product removed from wishlist:', id);
}
    return (
        <Container className="my-5">
            <h1 className="mb-4">My Wishlist</h1>
            {products.length === 0 ? (
                <p>Your wishlist is empty. Start adding some products!</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product.id}>
                            <Card className="h-80">
                                <Card.Img variant="top" src={product.image} alt={product.name} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="text-muted mb-2">${product.price.toFixed(2)}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Button
                                        variant="danger"
                                        className="mt-auto"
                                        onClick={() => onRemove(product.id)}
                                    >
                                        Remove from Wishlist
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}
