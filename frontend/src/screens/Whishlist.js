// import React from 'react'
// import { Button, Card, Col, Container, Row } from 'react-bootstrap'

// export const Whishlist = () => {
//     const products = [
//         { id: 1, name: "Smartphone", price: 699.99, image: "/logo512.png", description: "Latest model with advanced features." },
//         { id: 2, name: "Laptop", price: 1299.99, image: "/logo512.png", description: "Powerful laptop for work and play." },
//         { id: 3, name: "Headphones", price: 199.99, image: "/logo512.png", description: "Noise-cancelling wireless headphones." },
//     ];
// const onRemove=(id)=>{
//     // Remove product from wishlist here
//     console.log('Product removed from wishlist:', id);
// }
//     return (
//         <Container className="my-5">
//             <h1 className="mb-4">My Wishlist</h1>
//             {products.length === 0 ? (
//                 <p>Your wishlist is empty. Start adding some products!</p>
//             ) : (
//                 <Row xs={1} md={2} lg={3} className="g-4">
//                     {products.map((product) => (
//                         <Col key={product.id}>
//                             <Card className="h-80">
//                                 <Card.Img variant="top" src={product.image} alt={product.name} />
//                                 <Card.Body className="d-flex flex-column">
//                                     <Card.Title>{product.name}</Card.Title>
//                                     <Card.Text className="text-muted mb-2">${product.price.toFixed(2)}</Card.Text>
//                                     <Card.Text>{product.description}</Card.Text>
//                                     <Button
//                                         variant="danger"
//                                         className="mt-auto"
//                                         onClick={() => onRemove(product.id)}
//                                     >
//                                         Remove from Wishlist
//                                     </Button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             )}
//         </Container>
//     )
// }
// ** React Imports
// import { useContext } from 'react'

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText, Col, Row } from 'react-bootstrap'
// import { Row, Col } from 'reactstrap'

// ** Context
// import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
// import CompanyTable from './CompanyTable'
// import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
// import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
// import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
// import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
// import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
// import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
// import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
// import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
// import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
// import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
// import '@styles/react/libs/charts/apex-charts.scss'
// import '@styles/base/pages/dashboard-ecommerce.scss'

export const Whishlist = () => {
    // ** Context
    // const { colors } = useContext(ThemeColors)

    // ** vars
    // const trackBgColor = '#e9ecef'

    return (
        <div id='dashboard-ecommerce'>
            <Row className='match-height'>
                <Col xl='4' md='6' xs='12'>
                    <Card className='card-congratulations-medal'>
                        <CardBody>
                            <h5>Congratulations 🎉 John!</h5>
                            <CardText className='font-small-3'>You have won gold medal</CardText>
                            <h3 className='mb-75 mt-2 pt-50'>
                                <a href='/' onClick={e => e.preventDefault()}>
                                    $48.9k
                                </a>
                            </h3>
                            <Button color='primary'>View Sales</Button>
                            <img className='congratulation-medal' src={"medal"} alt='Medal Pic' />
                        </CardBody>
                    </Card>
                </Col>
                {/* <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col> */}
            </Row>
            {/* <Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='3' xs='6'>
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg='6' md='3' xs='6'>
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col lg='12' md='6' xs='12'>
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col>
      </Row> */}
        </div>
    )
}

// export default Whishlist