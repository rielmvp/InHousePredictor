from django.test import TestCase
from django.urls import reverse
import json
url = reverse('prediction')

class InputViewsTest(TestCase):
    
    def test_checkBedroomCountIsInteger(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'South Jakarta',
            'certificate': 'ABC123'
        }
        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        bedroom_count = context.get('bedroom_count')

        self.assertIsInstance(bedroom_count, int)

    def test_checkBathroomCountIsInteger(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'South Jakarta',
            'certificate': 'ABC123'
        }

        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        bathroom_count = context.get('bathroom_count')

        self.assertIsInstance(bathroom_count, int)

    def test_checkListingAreaIsInteger(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'South Jakarta',
            'certificate': 'ABC123'
        }

        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        listing_area = context.get('listing_area')

        self.assertIsInstance(listing_area, int)

    def test_checkJakartaDivisionIsString(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'SOUTH',
            'certificate': 'ABC123'
        }

        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        jakarta_division = context.get('jakarta_division')

        expected_divisions = ['NORTH', 'EAST', 'SOUTH', 'WEST', 'CENTRAL']
        self.assertIsInstance(jakarta_division, str)
        self.assertIn(jakarta_division, expected_divisions)

    def test_checkCertificateIsString(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'South Jakarta',
            'certificate': 'SHM - Sertifikat Hak Milik'
        }

        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        certificate = context.get('certificate')

        self.assertIsInstance(certificate, str)

    def test_checkStreetAddressIsString(self):
        data = {
            'street_address': '123 Main St',
            'bedroom_count': '2',
            'bathroom_count': '3',
            'listing_area': '150',
            'jakarta_division': 'South Jakarta',
            'certificate': 'ABC123'
        }

        json_data = json.dumps(data)  # Convert data to JSON string

        response = self.client.post(url, data=json_data, content_type='application/json')  # Set the content_type to 'application/json'
        self.assertEqual(response.status_code, 200)

        context = response.json()
        street_address = context.get('street_address')
        print(street_address)
        
        self.assertIsInstance(street_address, str)
