from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 25
    def get_paginated_response(self, data):
        res_data = {
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current': self.page.number,
            'results': data.get('offers'),
        }
        if data.get('dealer'):
            res_data['dealer'] = data.get('dealer')

        return Response(res_data)