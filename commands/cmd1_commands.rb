require 'ruble'

# ********************************************************
# COMMAND+1 
# ********************************************************

command 'gist POST' do |cmd|
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :output_to_console
  cmd.input = :selection
  cmd.invoke do |context|
    
    require 'net/http'
    require 'uri'
    
    selection = ENV['TM_SELECTED_TEXT']
    
    res = Net::HTTP.post_form(URI.parse('http://gist.github.com/api/v1/json/new'),
      { 'files[#{fileName}]' => selection,
        'login' => 'USER NAME HERE',
        'token' => 'API TOKEN HERE',
        'description' => 'This is a test description'
        })
    
    CONSOLE.puts "GIST RES:" + res.body
    
    context.browser.open("http://gist.github.com/mine", :browser => :default)
    
  end
end

command 'Ti WinX TabX Require UIWinX.js' do |cmd|
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    prefix = 'UIWin'
    input << "var "+prefix+className+" = require('"+prefix+className+"'); \n"
    input << "var win"+className+" = "+prefix+className+".factoryWindow({}); \n"
    input << "var tab"+className+" = Titanium.UI.createTab({ title:'"+className+"',icon:'KS_nav_views.png', window:win"+className+" });  \n"
    input << "win"+className+".parentNav = tab"+className+"; \n"
    input << "tabGroup.addTab(tab"+className+");\n"
    
    CONSOLE.puts "#{context.project.to_dir.path}\n";
      File.open("#{context.project.to_dir.path}"+File::SEPARATOR+"Resources"+File::SEPARATOR+prefix+className+".js", 'w') do |f|
        #f.write "//APPFAB"
    end
    
    input
    
  end
end

command 'Require X.js' do |cmd|
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    input << "var "+className+" = require('"+className+"'); \n"
    input << className+".init(); \n"
    
    CONSOLE.puts "#{context.project.to_dir.path}\n";
      File.open("#{context.project.to_dir.path}"+File::SEPARATOR+"Resources"+File::SEPARATOR+className+".js", 'w') do |f|
        #f.write "//APPFAB"
    end
    
    input
    
  end
end



command 'Ti WinX TabX X.js' do |cmd|
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var win"+className+" = Titanium.UI.createWindow({ title:'"+className+"',  backgroundColor:'#fff', url:'"+className+".js' }); \n"
    input << "var tab"+className+" = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'"+className+"', window:win"+className+" });  \n"
    input << "tabGroup.addTab(tab"+className+");\n"
    
    CONSOLE.puts "#{context.project.to_dir.path}\n";
      File.open("#{context.project.to_dir.path}"+File::SEPARATOR+"Resources"+File::SEPARATOR+className+".js", 'w') do |f|
        #f.write "//APPFAB"
    end
    
    input
    
  end
end


#uiTemplate
command 'uiTemplate' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var ui" + className + " = (function() {\n"
    input << "  \n"
    input << "  var API = { }; \n"
    input << "  \n"
    input << "  var myPrivateVar ='private'; \n"
    input << "  function myPrivateFunction(){  };\n "
    input << "  \n"
    input << "  API.myPublicVar = 'hello' \n"
    input << "  \n"
    input << "  API.factoryView = function(opts){ \n"
    input << "    topView = Ti.UI.createView({});\n"
    input << "    \n"
    input << "    return topView; \n"
    input << "  };\n"
    input << "  \n"    
    input << "  API.factoryWindow = function(opts){ \n"
    input << "     win = Ti.UI.createWindow({title:'ui"+className+"'}); \n"
    input << "     win.add( factoryView( options ) ); \n"
    input << "     return win; \n"
    input << "  };\n"
    input << "  \n"
    input << "  return API;\n"
    input << "})(); //end ui" + className
    input << "  \n"
    input << "Ti.UI.currentWindow.add( ui"+className+".factoryView({}) ); \n"
    input << "//ui"+className+".factoryWindow({}).open({modal:true})\n"
    input << "//ui"+className+".factoryWindow({}).open({fullscreen:true})\n"
    input << "  \n"
  end
end

command 'APP.AssetPath' do |cmd|
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "APP.AssetPath("+className+")"
  end  
end

