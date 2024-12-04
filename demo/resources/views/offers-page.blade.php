<div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">

    <div class="overflow-x-auto">

    @if($input==1)
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Christmas Offers for u are ready !!</h2>
    
    @elseif($input==2)
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">This is actually a black friday sales folks</h2>

    @elseif($input==3)
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Easter day Offers !!</h2>
    
    @else 
        
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800"></h2>
        
        @endif

        <table class="min-w-full table-auto border-collapse">
            <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <tr>
                    <th class="px-6 py-3 border-b">Product Name</th>
                    <th class="px-6 py-3 border-b">Regular Price</th>
                    <th class="px-6 py-3 border-b">Offer Price</th>
                    <th class="px-6 py-3 border-b">Discount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($products as $product)
                <tr class="border-b hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ $product->name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${{ number_format($product->price, 2) }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${{ number_format($product->old_price, 2) }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        @if($product->old_price < $product->price)
                            <span class="text-red-500 font-bold">
                                {{ round(100 - ($product->old_price / $product->price) * 100) }}% off
                            </span>
                        @else
                            <span class="text-green-500 font-bold">No Discount</span>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
