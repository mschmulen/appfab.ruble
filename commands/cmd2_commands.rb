require 'ruble'

# ********************************************************
# COMMAND+2  MACROS that create top level navigation metaphor
# ********************************************************

command 'TabWindow' do |cmd|
  cmd.key_binding = "Control+2"
  cmd.key_binding.mac = "Command+2"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var winA = new Window(L('products')); \n"
    input << "var tabA = Ti.UI.createTab({ title: L('products'), icon: '/images/KS_nav_ui.png', window: winA }); \n"
    input << "self.addTab(tabA); \n"
    input << " \n"
  end
end

command 'TabGroup' do |cmd|
  cmd.key_binding = "Control+2"
  cmd.key_binding.mac = "Command+2"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "Titanium.UI.setBackgroundColor('#000'); \n"
    input << "var tabGroup = Titanium.UI.createTabGroup(); \n"
    input << " \n"
    input << " \n"
    input << "tabGroup.open(); \n"
  end
end


command 'Dashboard' do |cmd|
  cmd.key_binding = "Control+2"
  cmd.key_binding.mac = "Command+2"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "Titanium.UI.setBackgroundColor('#000'); \n"
    input << "var tabGroup = Titanium.UI.createTabGroup(); \n"
    input << " \n"
    input << " \n"
    input << "tabGroup.open(); \n"
  end
end

command 'uiNav' do |cmd|
  cmd.key_binding = "Control+2"
  cmd.key_binding.mac = "Command+2"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiNav.js")
    input << "\n"
  end
end