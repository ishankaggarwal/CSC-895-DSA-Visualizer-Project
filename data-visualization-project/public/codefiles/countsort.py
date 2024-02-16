def counting_sort(arr):
    # Find the maximum value in the array
    max_value = max(arr)
    
    # Initialize a count array with zeros
    count = [0] * (max_value + 1)

    # Count occurrences of each element in the input array
    for num in arr:
        count[num] += 1

    # Reconstruct the sorted array using the count array
    sorted_array = []
    for i in range(max_value + 1):
        sorted_array.extend([i] * count[i])

    return sorted_array
