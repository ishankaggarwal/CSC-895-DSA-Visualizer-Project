def lowest_common_ancestor(root, node1, node2):
    if not root:
        return None

    # If either node1 or node2 is the root, then the root is the LCA
    if root.value == node1 or root.value == node2:
        return root

    # Recursively find LCA in the left and right subtrees
    left_lca = lowest_common_ancestor(root.left, node1, node2)
    right_lca = lowest_common_ancestor(root.right, node1, node2)

    # If both left and right subtrees return a non-None value, then the current root is the LCA
    if left_lca and right_lca:
        return root

    # If only one subtree returns a non-None value, then that subtree's result is the LCA
    return left_lca if left_lca else right_lca