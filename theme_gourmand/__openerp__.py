{
    'name': 'Gourmand Theme',
    'description': 'Gourmand Theme',
    'category': 'Website',
    'version': '1.0',
    'author': 'Odoo',
    'depends': ['website_sale'],
    'data': [
        'views/layout.xml',
        #'views/pages.xml',
        'views/snippets.xml',
        'views/options.xml',
        'data/images.xml',
    ],
    'application': True,
}
