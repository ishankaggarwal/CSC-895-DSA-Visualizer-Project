def level_order_traversal(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        current_node = queue.popleft()
        result.append(current_node.value)

        if current_node.left:
            queue.append(current_node.left)
        if current_node.right:
            queue.append(current_node.right)

    return result