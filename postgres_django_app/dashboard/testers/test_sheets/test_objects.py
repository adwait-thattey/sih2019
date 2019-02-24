from sheets.objects import Feature, SheetObject
import unittest


class FeatureCreationTest(unittest.TestCase):

    def setUp(self):
        self.name = "sample_feature1"
        self.values = [10, 20, 30]

    def test_feature_creation_all_params(self):

        feature = Feature(self.name,self.values)

        self.assertEqual(feature.name, self.name,)
        self.assertEqual(feature.values, self.values)

    def test_feature_create_missing_value(self):
        feature = Feature(self.name)
        self.assertEqual(feature.name, self.name,)
        self.assertIsNone(feature.values)

    def test_feature_create_no_values(self):

        with self.assertRaises(TypeError):
            feature = Feature()


class SubFeatureTest(unittest.TestCase):
    pass