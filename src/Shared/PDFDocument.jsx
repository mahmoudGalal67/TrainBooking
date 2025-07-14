// MyDocument.js
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Fragment } from 'react'

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 3 },
})

const MyDocument = ({ ticketDetails, carDetails, trainDetails, seats }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Ticket Detials</Text>
        <Text style={styles.text}>OriginCode: {trainDetails.OriginCode},</Text>
        <Text style={styles.text}>
          DestinationCode: {trainDetails.DestinationCode}
        </Text>
        <Text style={styles.text}>
          TrainNumber: {trainDetails.TrainInfo?.TrainNumber}
        </Text>
        <Text style={styles.text}>CarNumber: {carDetails[0].CarNumber}</Text>
        <Text style={styles.text}>CarType: {carDetails[0].CarType}</Text>
        <Text style={styles.text}>
          ticket number - {ticketDetails?.OrderId}
        </Text>
        <Text style={styles.text}>
          Passengers ({ticketDetails?.Customers.length})
        </Text>
        <br />
        {ticketDetails?.Customers.map((client, i) => (
          <Fragment key={i}>
            <Text style={styles.text}>
              Ticket Passenger Id ---
              {client.OrderCustomerId}
            </Text>
            <Text style={styles.text}>
              Gender---
              {client.Sex}
            </Text>
            <Text style={styles.text}>
              Ticket Passenger Id ---
              {client.OrderCustomerId}
            </Text>
            <Text style={styles.text}>
              {' '}
              Seat No---
              {seats[i]}
            </Text>
            <Text style={styles.text}>
              {' '}
              Document Number---
              {client.DocumentNumber}
            </Text>
            <Text style={styles.text}>
              {' '}
              Citizenship Code---
              {client.CitizenshipCode}
            </Text>
            <Text style={styles.text}>
              {' '}
              Amount---
              {ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]?.Amount}
            </Text>
            <Text style={styles.text}>
              {' '}
              Fare---
              {ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]?.Fare}
            </Text>
            <Text style={styles.text}>
              Tax---
              {ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]?.Tax}
            </Text>
            <Text style={styles.text}>
              Ticket Passenger Id ---
              {client.OrderCustomerId}
            </Text>
            <Text style={styles.text}>
              Ticket Passenger Id ---
              {client.OrderCustomerId}
            </Text>
          </Fragment>
        ))}
        <br />
        <Text style={styles.text}>
          Total Amount-- {ticketDetails?.ConfirmResults[0]?.Amount}
        </Text>
        <Text style={styles.text}>
          Total Fare-- {ticketDetails?.ConfirmResults[0]?.Fare}
        </Text>
        <Text style={styles.text}>
          Total Tax-- {ticketDetails?.ConfirmResults[0]?.Tax}
        </Text>
      </View>
    </Page>
  </Document>
)

export default MyDocument
