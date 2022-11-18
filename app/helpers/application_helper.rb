module ApplicationHelper
  def flash_css_class(type)
    map = { notice: 'alert alert-success', alert: 'alert alert-danger'}
    map[type.to_sym]
  end
end
