
class option:
    """
    Option object.
    """
    def __init__(self, id_label, name, is_correct):
        self.id_label = id_label
        self.name = name
        self.is_correct = is_correct

class question:
    """
    Question object.
    id_data:
    title:
    options: option list [option1: {-}, ..., option4: {-}]
    """
    def __init__(self, id_data, title, options):
        self.id_data = id_data
        self.title = title
        self.options = options