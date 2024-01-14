from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer
from django.db.models import Q, Value, IntegerField, Case, When
# from spellchecker import SpellChecker

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')

    search_fields = {
        'category': ['istartswith', 'iexact', 'icontains'],
        'subCategory': ['istartswith', 'iexact', 'icontains'],
        'brand': ['istartswith', 'iexact', 'icontains'],
        'name': ['istartswith', 'iexact', 'icontains']
    }

    q_objects = []

    for field, conditions in search_fields.items():
        for condition in conditions:
            q_objects.append(Q(**{f'{field}__{condition}': query}))

    combined_q = q_objects.pop()

    for q_obj in q_objects:
        combined_q |= q_obj

    products = Product.objects.filter(combined_q).annotate(
        rank=Case(
            *[When(
                **{f'{field}__istartswith': query},
                then=Value(rank)
            ) for rank, field in enumerate(search_fields.keys(), start=12)],
            default=Value(0),
            output_field=IntegerField()
        )
    ).order_by('-rank')

    serializer = ProductSerializer(products, many=True)  # Replace with the correct serializer
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create (
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock = 0,
        category = 'Sample Category',

        subCategory = 'Sample SubCategory',
        description = ''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    
    product.subCategory = data['subCategory']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    
    return Response('Image was uploaded')

@api_view(['POST'])
def uploadImage2(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image2 = request.FILES.get('image2')
    product.save()
    
    return Response('Image 2 was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1- Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #2- No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #3- Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({'Review Added'})