def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        mid_element = arr[mid]
        
        if mid_element == target:
            return mid  # Target found, return the index
        elif mid_element < target:
            low = mid + 1  # Target is in the right half
        else:
            high = mid - 1  # Target is in the left half
    
    return -1  # Target not found in the array
