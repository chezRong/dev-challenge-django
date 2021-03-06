from django.test import SimpleTestCase, Client
from json import dumps, loads


class TestViews(SimpleTestCase):
    def setUp(cls):
        """ Initialise Client """
        cls.client = Client()
        cls.validParams = {
            'initial': 1000,
            'savingsAmount': 100,
            'interestRate': 1.5,
            'frequency': 12,
        }

    def call(self, data):
        """ Helper function to call Client with payload """
        body = dumps(data)
        resp = self.client.post("/calculate/", body, "application/json", follow=True)
        return resp

    def test_missing_params(self):
        """ Test Error Response when Params are missing """
        expected_content = b"Required parameters not provided"
        expected_status_code = 400

        resp = self.call({"savingsAmount": 1000})
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

        resp = self.call({"interestRate": 1.5})
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

    def test_incorrect_param_types(self):
        """ Test Error Response when Params are of incorrect type """
        expected_content = b"Required parameters must be numbers"
        expected_status_code = 400

        resp = self.call({**self.validParams, "savingsAmount": 'Hello' })
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

        resp = self.call({**self.validParams, "interestRate": 'World'})
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

    def test_negative_param_values(self):
        """ Test Error Response when Params are negative """
        expected_content = b"Required parameters must be non-negative"
        expected_status_code = 400

        resp = self.call({**self.validParams, "savingsAmount": -1000})
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

        resp = self.call({**self.validParams, "interestRate": -1.5})
        self.assertEquals(resp.content, expected_content)
        self.assertEquals(resp.status_code, expected_status_code)

    def test_valid_params(self):
        """ Test Calculator works as expected with correct input """
        # Monthly Interest
        expected_status_code = 200
        expected_end_value = 91508.31

        resp = self.call({**self.validParams})
        data = loads(resp.content)["result"]
        self.assertEquals(resp.status_code, expected_status_code)
        self.assertEquals(data[-1]["amount"], expected_end_value)

        # Quarterly Interest
        expected_end_value = 91459.44

        resp = self.call({**self.validParams, 'frequency': 4})
        data = loads(resp.content)["result"]
        self.assertEquals(resp.status_code, expected_status_code)
        self.assertEquals(data[-1]["amount"], expected_end_value)

        # Yearly Interest
        expected_end_value = 91243.04

        resp = self.call({**self.validParams, 'frequency': 1})
        data = loads(resp.content)["result"]
        self.assertEquals(resp.status_code, expected_status_code)
        self.assertEquals(data[-1]["amount"], expected_end_value)
